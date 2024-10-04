import gallows from 'gallows';
import smarkup from 'smarkup';

class Necronomicon {
  constructor(commands, symbols) {
    this.commands = commands;
    this.symbols = symbols;
    this.gallows = gallows();
    this.smarkup = smarkup({
      symbols: this.symbols
    });
  }

  document() {
    // Generate documentation for available commands
    return this.commands.map(command => {
      return {
        name: command.name,
        description: command.description,
        example: {
          attributes: command.example.attributes,
          body: command.example.body
        }
      };
    });
  }

  execute(text) {
    const directives = this.smarkup.parse(text);
    return this.gallows.execute(directives);
  }
}

export default function necronomicon(options) {
  return new Necronomicon(options.commands, options.symbols);
}
```

This `necronomicon.js` file defines the main `Necronomicon` class, which takes in the `commands` and `symbols` options and sets up the `gallows` and `smarkup` instances. The `document()` method generates documentation for the available commands, and the `execute(text)` method parses the provided text for smarkup directives and executes them using the `gallows` framework.

The exported `necronomicon` function simply creates a new `Necronomicon` instance with the provided options.

Let me know if you have any other requests or changes to the Necronomicon project!