import { render, fireEvent, screen } from '@testing-library/react';
import TextInput from '.';

describe('#TextInput', () => {
  it('should render input field', () => {
    const { getByRole } = render(<TextInput />);
    const InputElement = getByRole('textbox');
    expect(InputElement).toBeTruthy();
  });

  it('should render button if showButton prop is true', () => {
    const { getByRole } = render(<TextInput showButton />);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call onClick function when button is clicked', () => {
    const onClickMock = jest.fn();
    render(<TextInput showButton button={{ onClick: onClickMock }} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render icon inside button if provided', () => {
    render(<TextInput showButton button={{ element: <span>Test Icon</span> }} />);
    const iconElement = screen.getByText('Test Icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('should render default icon inside button if icon prop is not provided', () => {
    const { container } = render(<TextInput showButton />);
    expect(container.getElementsByTagName('svg')).toBeTruthy();
  });

});
