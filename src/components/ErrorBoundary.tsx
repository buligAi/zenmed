import { Component, ErrorInfo, ReactNode } from 'react';
import { Center, Stack, Title, Button, Text } from '@mantine/core';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center h="100vh">
          <Stack align="center" gap="md">
            <Title order={2}>Something went wrong</Title>
            <Text c="dimmed">We apologize for the inconvenience</Text>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Stack>
        </Center>
      );
    }

    return this.props.children;
  }
}