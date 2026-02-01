import { render, screen, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from '../App'

vi.useFakeTimers();

test('ready', async () => {
    render(<App />);
    const button = screen.getByText('Start');
    expect(screen.getByText("start")).toBeInTheDocument();
})