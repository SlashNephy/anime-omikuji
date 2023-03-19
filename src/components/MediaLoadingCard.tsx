import { Card, Loading, Row, Spacer, Text } from '@nextui-org/react'
import React from 'react'

export function MediaLoadingCard(): JSX.Element {
  return (
    <Card css={{ mw: '300px' }}>
      <Card.Body>
        <Row align="center" justify="center">
          <Text>Loading...</Text>
        </Row>
        <Spacer y={1} />
        {/* TODO */}
        {/* <Progress shadow striped color="success" /> */}
        <Loading />
      </Card.Body>
    </Card>
  )
}
