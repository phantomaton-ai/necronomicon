import gallows from 'gallows';
import smarkup from 'smarkup';

class Necronomicon {
  constructor(commands, symbols, includes) {
    this.commands = commands;
    this.gallows = gallows(commands);
    this.smarkup = smarkup({ symbols, text: true });
    this.includes = {
      results: true,
      text: true,
      directives: true,
      descriptions: true,
      ...includes
    };
  }

  document() {
    const commands = this.includes.descriptions ? this.commands.map(command => [
      `## ${command.name}`,
      command.description,
      this.smarkup.render([{ action: command.name, ...command.example }]),
    ].join('\n\n')).join('\n\n') : this.smarkup.render(this.gallows.examples());

    return [
      'Commands may be executed using a custom directive syntax.',
      '# Directive syntax',
      this.smarkup.document(),
      '# Available commands',
      commands
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
    return this.includes.directives ?
      this.smarkup.render(executed) :
      executed.map(({ body, text }) => body || text).join('\n');
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols, options.includes);
}