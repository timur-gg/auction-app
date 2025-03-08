import React from 'react';
import {
  Anchor,
  Space,
  Text,
  Button,
  Stack,
  Container,
  List,
  Title,
  Checkbox,
  ScrollArea,
} from '@mantine/core';
import { text } from '../../text.js';

const SignupStep6 = () => {
  const conditionText = text.auctionRules.map((rule) => (
    <List.Item>
      <Title order={5}>{rule.title}</Title>
      {rule.text}
    </List.Item>
  ));
  return (
    <Container maw={800} miw={300}>
      <Stack align="center" ta="left">
        <Title order={2} ta="center">
          Terms and Conditions
        </Title>

        <ScrollArea h={350} type="always" offsetScrollbars p={20} fz={14}>
          Charizard is a draconic, bipedal Pokémon. It is primarily orange with
          a cream underside from the chest to the tip of its tail. It has a long
          neck, small blue eyes, slightly raised nostrils, and two horn-like
          structures protruding from the back of its rectangular head. There are
          two fangs visible in the upper jaw when its mouth is closed. Two large
          wings with blue-green undersides sprout from its back, and a horn-like
          appendage juts out from the top of the third joint of each wing. A
          single wing-finger is visible through the center of each wing
          membrane. <br />
          <br />
          Charizard's arms are short and skinny compared to its robust belly,
          and each limb has three white claws. It has stocky legs with
          cream-colored soles on each of its plantigrade feet. The tip of its
          long, tapering tail burns with a sizable flame. As Mega Charizard X,
          its body and legs are more physically fit, though its arms remain
          thin. Its skin turns black with a sky-blue underside and soles. Two
          spikes with blue tips curve upward from the front and back of each
          shoulder, while the tips of its horns sharpen, turn blue, and curve
          slightly upward. Its brow and claws are larger, and its eyes are now
          red. It has two small, fin-like spikes under each horn and two more
          down its lower neck. The finger disappears from the wing membrane, and
          the lower edges are divided into large, rounded points. The third
          joint of each wing-arm is adorned with a claw-like spike. <br />
          <br />
          Mega Charizard X breathes blue flames out the sides of its mouth, and
          the flame on its tail now burns blue. It is said that its new power
          turns it black and creates more intense flames.
        </ScrollArea>
        <Space />
        <Checkbox size="md" label="I agree to the terms of use" />
      </Stack>
    </Container>
  );
};

export default SignupStep6;
