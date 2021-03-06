import { githubRepoUrl } from '@codesandbox/common/lib/utils/url-generator';
import {
  Button,
  Collapsible,
  Element,
  Link,
  Stack,
  Text,
} from '@codesandbox/components';
import { github as GitHubIcon } from '@codesandbox/components/lib/components/Icon/icons';
import { useOvermind } from 'app/overmind';
import React from 'react';

import { Explorer } from '../Explorer';

export const GithubSummary = () => {
  const {
    state: { editor },
    actions: {
      editor: { forkSandboxClicked },
    },
  } = useOvermind();
  return (
    <>
      <Collapsible title="GitHub Repository" defaultOpen>
        <Element paddingX={2}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={githubRepoUrl(editor.currentSandbox.git)}
          >
            <Stack gap={2} marginBottom={6} align="center">
              <GitHubIcon width={20} />
              <Text size={2}>
                {editor.currentSandbox.git.username}/
                {editor.currentSandbox.git.repo}
              </Text>
            </Stack>
          </Link>
          <Text variant="muted" size={3}>
            This Sandbox is in sync with{' '}
            <Text weight="bold">{editor.currentSandbox.git.branch}</Text> on
            GitHub. You have to fork to make changes
          </Text>
          <Button
            marginTop={8}
            variant="primary"
            loading={editor.isForkingSandbox}
            onClick={() => forkSandboxClicked()}
          >
            {editor.isForkingSandbox ? 'Forking...' : 'Fork'}
          </Button>
        </Element>
      </Collapsible>
      <Explorer readonly />
    </>
  );
};
