import gallows from 'gallows';
import smarkup from 'smarkup';

const asynchrony = {
  map: async (array, fn) => {
    const results = [];
    for (let index = 0; index < array.length; index += 1) {
      results.push(await fn(array[index], index));        
    }
    return results;
  },
  filter: async (array, fn) => (await array).filter(fn),
  apply: async (array, fn) => fn(await array)
};
const synchrony = {
  map: (array, fn) => array.map(fn),
  filter: (array, fn) => array.filter(fn),
  apply: (array, fn) => fn(array)
};

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
      promises: false,
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
    const { apply, map, filter } = this.includes.promises ? asynchrony : synchrony;

    const executed = filter(map(directives, (
      { action, attributes, body, text }
    ) => action ? apply(
      this.gallows.execute(action, attributes, body),
      executed => ({
        action, attributes, body: executed 
      })
    ) : { text }), ({ action, text }) =>
      (this.includes.results && action) || (this.includes.text && text)
    );

    const postprocess =  this.includes.directives ?
      executed => this.smarkup.render(executed) :
      executed => executed.map(({ body, text }) => body || text).join('\n');
    
    return apply(executed, postprocess);
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols, options.includes);
}