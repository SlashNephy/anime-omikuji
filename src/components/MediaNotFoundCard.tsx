import { Card, Row, Spacer, Text } from '@nextui-org/react'
import { IconMoodSadSquint } from '@tabler/icons-react'
import React from 'react'

export function MediaNotFoundCard(): JSX.Element {
  return (
    <Card css={{ mw: '400px' }}>
      <Card.Body>
        <Row align="center" justify="center">
          <IconMoodSadSquint />
        </Row>
        <Spacer y={1} />
        <Row align="center" justify="center">
          <Text>No media were found that meet your filters...</Text>
        </Row>
      </Card.Body>
    </Card>
  )
}
