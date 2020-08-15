module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/preset-typescript",
    "@storybook/addon-knobs/register",
  ],
};
