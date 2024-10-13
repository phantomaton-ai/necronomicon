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
    return this.gallows.execute(directives);
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols);
}
