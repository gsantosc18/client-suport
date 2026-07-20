import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="E-mail" placeholder="Enter email" />);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('renders error message and applies error styles', () => {
    render(<Input label="Password" error="Invalid password" placeholder="Enter pass" />);
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText('Enter pass');
    expect(input.className).toContain('border-destructive');
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(<Input label="Password" type="password" placeholder="Enter pass" />);
    const input = screen.getByPlaceholderText('Enter pass');
    
    // Initially type is password
    expect(input).toHaveAttribute('type', 'password');
    
    // Find and click the eye button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Type should now be text
    expect(input).toHaveAttribute('type', 'text');
    
    // Click again
    fireEvent.click(toggleButton);
    
    // Type should be password again
    expect(input).toHaveAttribute('type', 'password');
  });
});
