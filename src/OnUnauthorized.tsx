import { Button, Card, Grid, Link, Row, Spacer, Text, Tooltip } from '@nextui-org/react'
import { IconBrandGithub, IconCookieOff, IconSpyOff } from '@tabler/icons-react'
import React from 'react'

import { useAniListAuthorizeUrl } from './lib/anilist/oauth2'
import packageJson from '../package.json'

export function OnUnauthorized(): JSX.Element {
  const authorizeUrl = useAniListAuthorizeUrl()

  return (
    <Card
      css={{
        padding: '0 $8',
      }}
    >
      <Card.Header>
        <Row align="center" justify="center">
          <Text h1>Anime Omikuji</Text>
        </Row>
      </Card.Header>

      <Card.Body>
        <Row align="center" justify="center">
          <Text size={20}>
            Anime Omikuji is a tool that draws random anime from AniList. Since it uses AniList API, it is necessary to
            log in with your AniList account.
          </Text>
        </Row>

        <Spacer y={2} />

        <Row align="center" justify="center">
          <Link href={authorizeUrl}>
            <Button auto shadow color="gradient">
              Sign in with AniList
            </Button>
          </Link>
        </Row>

        <Spacer y={2} />

        <Row align="center" justify="center">
          <Card variant="flat">
            <Card.Body>
              <Row align="center" justify="center">
                <Tooltip rounded color="success" content="Privacy First" placement="left">
                  <IconSpyOff size={32} style={{ marginRight: '8px' }} />
                </Tooltip>

                <Tooltip rounded color="success" content="Cookieless" placement="right">
                  <IconCookieOff size={32} />
                </Tooltip>
              </Row>

              <Spacer y={1} />

              <Row align="center" justify="center">
                <Text>
                  Anime Omikuji does not send any personal information to third parties, and the process is performed
                  entirely in your browser.
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Card.Body>

      <Spacer y={1.5} />

      <Card.Footer>
        <Grid.Container gap={1} justify="center">
          <Grid>
            Visit source code on
            <Link color="primary" css={{ paddingLeft: '$2' }} href={packageJson.repository.url} target="_blank">
              <IconBrandGithub size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> GitHub
            </Link>
            .
          </Grid>

          <Grid>
            Made with &hearts; by
            <Link css={{ paddingLeft: '$2' }} href="https://github.com/SlashNephy" target="_blank">
              @SlashNephy
            </Link>
            .
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  )
}
