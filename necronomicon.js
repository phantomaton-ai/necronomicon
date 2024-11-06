import gallows from 'gallows';
import smarkup from 'smarkup';

class Necronomicon {
  constructor(commands, symbols, includes) {
    this.commands = commands;
    this.gallows = gallows(commands);
    this.smarkup = smarkup({ symbols, text: true });
    this.includes = includes || { results: true };
  }

  document() {
    return [
      'Commands may be executed using a custom directive syntax.',
      '# Directive syntax',
      this.smarkup.document(),
      '# Available commands',
      this.smarkup.render(this.gallows.examples()),
    ].join('\n\n');
  }

  execute(text) {
    const directives = this.smarkup.parse(text);
    const executed = directives.map(({ action, attributes, body, text }) => action ? {
      action,
      attributes,
      body: this.gallows.execute(action, attributes, body)
    } : { text }).filter(({ action, text }) =>
      (this.includes.results && action) || (this.includes.text && text)
    );
    return this.smarkup.render(executed);
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols);
}
