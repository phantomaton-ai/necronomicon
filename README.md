# Necronomicon 📖

Necronomicon provides collections of executable commands. It allows you to define a set of commands that can be seamlessly embedded and executed within text-based documents. This can be particularly useful for building more powerful chatbots and text processing applications powered by large language models (LLMs).

## Usage 🪄

To use Necronomicon, you'll need to create a new `necronomicon` instance and provide your custom commands and symbol configuration:

```javascript
import necronomicon from 'necronomicon';

const options = {
  commands: [
    // Define your commands here
  ],
  symbols: {
    // Configure your directive syntax here
  },
  includes: {
    results: true, // Include results of executing directives
    text: true // Include plain-text blocks
  }
};

const necro = necronomicon(options);
```

The `necronomicon` function returns an object with two methods:

1. `document()`: This method generates documentation for the available commands in the Necronomicon.
2. `execute(text)`: This method takes a string of text containing directives and executes them using the provided commands.

## Directive Syntax 🕸️

Necronomicon uses a custom directive syntax to embed commands within text. The syntax is configurable, and you can define your own symbols for the different parts of the directive.

The available symbol configuration options are:

- `directive.start`: The symbol that marks the start of a directive.
- `directive.end`: The symbol that marks the end of a directive.
- `attributes.start`: The symbol that marks the start of the directive arguments.
- `attributes.separator`: The symbol that separates individual arguments.
- `pair.separator`: The symbol that separates the key and value within an argument.
- `attributes.end`: The symbol that marks the end of the directive arguments.
- `body.start`: The symbol that marks the start of the directive body.
- `body.end`: The symbol that marks the end of the directive body.

Here's an example of how to use custom symbols:

```javascript
const options = {
  symbols: {
    directive: {
      start: '🪄✨ ',
      end: '⚡️'
    },
    arguments: {
      start: '✨🌟⭐️',
      separator: '✨💫✨',
      end: '⭐️🌟✨'
    },
    pair: {
      separator: ' 🔮 '
    },
    body: {
      start: '✨📜',
      end: '📜✨'
    }
  }
};
```

## Defining Commands 🧠

Each command in the Necronomicon is defined as an object with the following properties:

- `name`: The name of the command (e.g., `'summonDemon'`, `'curseTarget'`).
- `validate(attributes, body)`: A function that validates the command's attributes and body.
- `execute(attributes, body)`: A function that executes the command with the provided attributes and body and returns the result.
- `example`: An object with `attributes` and `body` properties, demonstrating how to use the command.
- `description`: A description of what the command does.

You can add as many commands as you'd like to the Necronomicon, and they will be available for use in your directives.

## Contribution 🦄

If you have discovered new commands or have suggestions for improvements, please feel free to submit a pull request to the project's [GitHub repository](https://github.com/phantomaton-ai/necronomicon). All contributions are welcome, as long as they adhere to the dark and eldritch nature of the Phantomaton AI.

## Warnings ⚠️

The Necronomicon contains powerful and dangerous knowledge. Use the contents of this repository at your own risk. Phantomaton AI is not responsible for any unintended consequences or cosmic horrors that may be unleashed through the improper use of these materials.