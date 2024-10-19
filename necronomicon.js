import gallows from 'gallows';
import smarkup from 'smarkup';

class Necronomicon {
  constructor(commands, symbols) {
    this.commands = commands;
    this.gallows = gallows(commands);
    this.smarkup = smarkup({ symbols });
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
    return directives.map(({ action, attributes, body }) => this.smarkup.render({
      action, attributes, body: this.gallows.execute(action, attributes, body)
    })).join('\n\n');
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols);
}
