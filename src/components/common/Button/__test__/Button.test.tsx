import { fireEvent, render } from "@testing-library/react-native";

import { StyleSheet } from "react-native";

import { Button } from "../index";

describe("components - common - Button", () => {
  it("match the snapshot", () => {
    const functionMock = jest.fn();

    const { toJSON } = render(
      <Button label="Test" type="primary" onPress={functionMock} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render the primary button with the correct text and style", () => {
    const functionMock = jest.fn();

    const { getByTestId } = render(
      <Button label="Test" type="primary" onPress={functionMock} />,
    );

    const buttonLabel = getByTestId("button-label");
    expect(buttonLabel).toBeTruthy();
    expect(buttonLabel).toHaveTextContent("Test");

    const flattenedLabelStyle = StyleSheet.flatten(buttonLabel.props.style);
    expect(flattenedLabelStyle.color).toBe("white");
    expect(flattenedLabelStyle.fontSize).toBe(16);
    expect(flattenedLabelStyle.fontWeight).toBe("bold");

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer).toBeTruthy();

    const flattenedContainerStyle = StyleSheet.flatten(
      buttonContainer.props.style,
    );
    expect(flattenedContainerStyle.backgroundColor).toBe("gray");
    expect(flattenedContainerStyle.width).toBe("100%");
    expect(flattenedContainerStyle.minHeight).toBe(42);
    expect(flattenedContainerStyle.borderRadius).toBe(8);
    expect(flattenedContainerStyle.justifyContent).toBe("center");
    expect(flattenedContainerStyle.alignItems).toBe("center");
  });

  it("should render the ghost button with the correct text and style", () => {
    const functionMock = jest.fn();

    const { getByTestId } = render(
      <Button label="Test" type="ghost" onPress={functionMock} />,
    );

    const buttonLabel = getByTestId("button-label");
    expect(buttonLabel).toBeTruthy();
    expect(buttonLabel).toHaveTextContent("Test");

    const flattenedLabelStyle = StyleSheet.flatten(buttonLabel.props.style);
    expect(flattenedLabelStyle.color).toBe("black");
    expect(flattenedLabelStyle.fontSize).toBe(16);
    expect(flattenedLabelStyle.fontWeight).toBe("bold");

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer).toBeTruthy();

    const flattenedContainerStyle = StyleSheet.flatten(
      buttonContainer.props.style,
    );
    expect(flattenedContainerStyle.backgroundColor).toBe("transparent");
    expect(flattenedContainerStyle.width).toBe("100%");
    expect(flattenedContainerStyle.minHeight).toBe(42);
    expect(flattenedContainerStyle.borderRadius).toBe(8);
    expect(flattenedContainerStyle.justifyContent).toBe("center");
    expect(flattenedContainerStyle.alignItems).toBe("center");
  });

  it("should render the outline button with the correct text and style", () => {
    const functionMock = jest.fn();

    const { getByTestId } = render(
      <Button label="Test" type="outline" onPress={functionMock} />,
    );

    const buttonLabel = getByTestId("button-label");
    expect(buttonLabel).toBeTruthy();
    expect(buttonLabel).toHaveTextContent("Test");

    const flattenedLabelStyle = StyleSheet.flatten(buttonLabel.props.style);
    expect(flattenedLabelStyle.color).toBe("black");
    expect(flattenedLabelStyle.fontSize).toBe(16);
    expect(flattenedLabelStyle.fontWeight).toBe("bold");

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer).toBeTruthy();

    const flattenedContainerStyle = StyleSheet.flatten(
      buttonContainer.props.style,
    );
    expect(flattenedContainerStyle.backgroundColor).toBe("transparent");
    expect(flattenedContainerStyle.borderWidth).toBe(1);
    expect(flattenedContainerStyle.borderColor).toBe("gray");
    expect(flattenedContainerStyle.width).toBe("100%");
    expect(flattenedContainerStyle.minHeight).toBe(42);
    expect(flattenedContainerStyle.borderRadius).toBe(8);
    expect(flattenedContainerStyle.justifyContent).toBe("center");
    expect(flattenedContainerStyle.alignItems).toBe("center");
  });

  it("should call the onPress function when the button is pressed", () => {
    const functionMock = jest.fn();

    const { getByText } = render(
      <Button label="Test" type="primary" onPress={functionMock} />,
    );

    const button = getByText("Test");
    fireEvent.press(button);

    expect(functionMock).toHaveBeenCalled();
  });

  it("should render the loading indicator when the button is loading", () => {
    const { getByTestId } = render(
      <Button label="Test" type="primary" isLoading />,
    );

    const loadingIndicator = getByTestId("button-loading-indicator");

    expect(loadingIndicator).toBeTruthy();
  });
});
