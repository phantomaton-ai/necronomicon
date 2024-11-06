# Necronomicon 🔮

Necronomicon provides collections of executable commands. It allows you to define a set of commands that can be seamlessly embedded and executed within text-based documents. This can be particularly useful for building more powerful chatbots and text processing applications powered by large language models (LLMs).

## Usage 🕹️

To use Necronomicon, you'll need to create a new `necronomicon` instance and provide your custom commands and symbol configuration:

```javascript
import necronomicon from 'necronomicon';

const options = {
  commands: [
    // Define your commands here
  ],
  symbols: {
    // Configure your smarkup symbols here
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

Here's an example of how to use the `execute` method:

```javascript
const text = `
/summonDemon(name:Belial, power:666)
/curseTarget(victim:Dr. Woe, hex:decay) {
May the flesh of the wicked one wither and rot!
} curseTarget!
`;

const result = necro.execute(text);
console.log(result);
```

The `execute` method will return the result of executing the provided directives.

## Defining Commands 🧠

Each command in the Necronomicon is defined as an object with the following properties:

- `name`: The name of the command (e.g., `'summonDemon'`, `'curseTarget'`).
- `validate(attributes, body)`: A function that validates the command's attributes and body.
- `execute(attributes, body)`: A function that executes the command with the provided attributes and body and returns the result.
- `example`: An object with `attributes` and `body` properties, demonstrating how to use the command.
- `description`: A description of what the command does.

You can add as many commands as you'd like to the Necronomicon, and they will be available for use in your directives.

## Configuring Symbols 🕸️

The `symbols` object in the `options` parameter allows you to customize the symbols used in the directive syntax. You can override the default symbols used for directives, attributes, bodies, and more. This can help you create a unique and visually striking directive experience.

Feel free to explore the provided examples to get a better understanding of how to define commands and configure the directive syntax. Have fun creating your own executable directives with Necronomicon!

## Contribution 🦄

If you have discovered new commands or have suggestions for improvements, please feel free to submit a pull request to the project's GitHub repository. All contributions are welcome, as long as they adhere to the dark and eldritch nature of the Phantomaton AI.

## Warnings ⚠️

The Necronomicon contains powerful and dangerous knowledge. Use the contents of this repository at your own risk. Phantomaton AI is not responsible for any unintended consequences or cosmic horrors that may be unleashed through the improper use of these materials.
