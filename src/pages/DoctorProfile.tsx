import { useState, useRef } from 'react';
import {
  Container,
  Paper,
  TextInput,
  Button,
  Grid,
  Title,
  Avatar,
  Group,
  Text,
  Box,
  Stack,
  FileButton
} from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';

const demoDoctor = {
  id: 'D001',
  name: 'Dr. John Doe',
  email: 'john.doe@zenmed.com',
  phone: '123-456-7890',
  prcId: 'PRC-12345',
  specialization: 'Internal Medicine',
  licenseExpiry: '2024-12-31',
  clinicAddress: '123 Medical Plaza, Manila',
  signature: '/signatures/doctor-signature.png',
  avatar: null
};

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(demoDoctor);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (file: File) => {
    if (file) {
      setSignatureFile(file);
    }
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Updated doctor profile:', doctor);
    if (signatureFile) {
      console.log('New signature file:', signatureFile);
    }
  };

  return (
    <Container size="lg">
      <Title order={2} mb="lg">Doctor Profile</Title>
      
      <Paper shadow="sm" p="md" radius="md">
        <Stack spacing="lg">
          {/* Avatar Section */}
          <Group position="center">
            <Box pos="relative">
              <Avatar
                src={avatarPreview || doctor.avatar}
                size={100}
                radius={100}
              >
                {doctor.name[0]}
              </Avatar>
              <FileButton
                onChange={handleAvatarUpload}
                accept="image/*"
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="light"
                    size="xs"
                    radius="xl"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0
                    }}
                  >
                    <IconCamera size={14} />
                  </Button>
                )}
              </FileButton>
            </Box>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Full Name"
                value={doctor.name}
                onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                value={doctor.email}
                onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone"
                value={doctor.phone}
                onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="PRC ID Number"
                value={doctor.prcId}
                onChange={(e) => setDoctor({ ...doctor, prcId: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Specialization"
                value={doctor.specialization}
                onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="License Expiry"
                type="date"
                value={doctor.licenseExpiry}
                onChange={(e) => setDoctor({ ...doctor, licenseExpiry: e.target.value })}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Clinic Address"
                value={doctor.clinicAddress}
                onChange={(e) => setDoctor({ ...doctor, clinicAddress: e.target.value })}
              />
            </Grid.Col>
          </Grid>

          {/* Digital Signature Section */}
          <Box>
            <Title order={4} mb="sm">Digital Signature</Title>
            <Group spacing="md">
              {doctor.signature && (
                <img
                  src={doctor.signature}
                  alt="Doctor's signature"
                  style={{ maxWidth: 200, maxHeight: 100 }}
                />
              )}
              <FileButton
                onChange={handleSignatureUpload}
                accept="image/*"
              >
                {(props) => (
                  <Button {...props} variant="light">
                    Upload Signature
                  </Button>
                )}
              </FileButton>
            </Group>
          </Box>

          <Group position="right">
            <Button variant="filled" onClick={handleSave}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}