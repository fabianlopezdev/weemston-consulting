import { Card, Text, Flex, Box, Stack, Button } from '@sanity/ui';
import { HiInformationCircle, HiPlus } from 'react-icons/hi';
import { useClient } from 'sanity';
import { IntentLink } from 'sanity/router';
import { useState, useEffect } from 'react';

interface DocumentListWithBannerOptions {
  schemaType: string;
  message: string;
}

interface SanityDocument {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  client?: string;
}

export function DocumentListWithBanner(props: {
  options?: DocumentListWithBannerOptions;
}) {
  const { options } = props;
  const message = options?.message || '';
  const schemaType = options?.schemaType || '';

  const client = useClient({ apiVersion: '2024-01-01' });
  const [documents, setDocuments] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schemaType) return;

    setLoading(true);
    setDocuments([]);

    const query = `*[_type == $type] | order(_createdAt desc) { _id, _type, title, name, client }`;
    client
      .fetch<SanityDocument[]>(query, { type: schemaType })
      .then((docs) => {
        setDocuments(docs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching documents:', err);
        setLoading(false);
      });
  }, [client, schemaType]);

  // Get display name for the schema type
  const getTypeName = () => {
    switch (schemaType) {
      case 'service':
        return 'Service';
      case 'caseStudy':
        return 'Case Study';
      case 'testimonial':
        return 'Testimonial';
      default:
        return 'Document';
    }
  };

  return (
    <Stack space={0} style={{ height: '100%', overflow: 'auto' }}>
      {message && (
        <Card padding={3} tone="primary" border>
          <Flex align="flex-start" gap={3}>
            <Box style={{ flexShrink: 0, marginTop: 2 }}>
              <Text size={1}>
                <HiInformationCircle style={{ fontSize: '1.25em' }} />
              </Text>
            </Box>
            <Text size={1} muted>
              {message}
            </Text>
          </Flex>
        </Card>
      )}
      <Box padding={3}>
        <Box marginBottom={3}>
          <Button
            as={IntentLink}
            intent="create"
            params={{ type: schemaType }}
            icon={HiPlus}
            text={`Create ${getTypeName()}`}
            tone="primary"
            style={{ textDecoration: 'none' }}
          />
        </Box>
        {loading ? (
          <Text size={1} muted>
            Loading...
          </Text>
        ) : documents.length === 0 ? (
          <Text size={1} muted>
            No documents found
          </Text>
        ) : (
          <Stack space={2}>
            {documents.map((doc) => (
              <Card
                key={doc._id}
                as={IntentLink}
                intent="edit"
                params={{ id: doc._id, type: doc._type }}
                padding={3}
                radius={2}
                style={{ textDecoration: 'none' }}
              >
                <Text size={1}>{doc.title || doc.name || doc.client || 'Untitled'}</Text>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
