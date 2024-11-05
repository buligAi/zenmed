import { useState } from 'react';
import {
  Container,
  Paper,
  TextInput,
  Button,
  Title,
  Stack,
  Alert,
  Center,
  Loader
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('doctor@zenmed.com');
  const [password, setPassword] = useState('password123');
  const { login, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Container size="xs">
      <Center mih="100vh">
        <Paper shadow="md" p="xl" w="100%">
          <Stack>
            <Title order={1} ta="center" c="blue">
              ZenMed
            </Title>
            <Title order={2} ta="center">
              Sign in
            </Title>

            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Error"
                color="red"
                variant="light"
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack>
                <TextInput
                  required
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your email"
                />

                <TextInput
                  required
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter your password"
                />

                <Button
                  type="submit"
                  disabled={loading}
                  h={42}
                >
                  {loading ? <Loader size="sm" /> : 'Sign In'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
}