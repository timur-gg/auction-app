import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import { Badge, Space, Box, Grid, Image, Title } from '@mantine/core';
import 'typeface-roboto';
import comic1 from '@auction-app/assets/1B/1B.png';
import comic2 from '@auction-app/assets/1A/1A.png';
import comic3 from '@auction-app/assets/2A/2A.png';
import comic4 from '@auction-app/assets/2B/2B.png';
import comic5 from '@auction-app/assets/3A/3A.png';
import comic6 from '@auction-app/assets/3B/3B.png';
import comic7 from '@auction-app/assets/4A/4A.png';
import comic8 from '@auction-app/assets/4B/4B.png';

const Slides = [
  {
    img: comic1,
    txt: 'Hours in lines in front of a sales office',
  },
  {
    img: comic2,
    txt: '...Or just go to our website ',
  },
  {
    img: comic3,
    txt: 'You spend a lot of time and sometimes you make a mistake',
  },
  {
    img: comic4,
    txt: 'Plenty of good options and no pressure to make a right decision ',
  },
  { img: comic5, txt: '' },
  {
    img: comic6,
    txt: 'It’s an auction. So there is a fixed starting price for everyone',
  },
  {
    img: comic7,
    txt: 'Sometiemes the price includes hidden fees',
  },
  { img: comic8, txt: "It's such a great deal!" },
];

const ComicPic = ({ ind }: { ind: number }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint1 = 1000;
  const breakpoint = 760;
  const midSize = width > breakpoint && width < breakpoint1;
  React.useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);
  const autoplay = useRef(Autoplay({ delay: 3500 }));

  return (
    <>
      <Grid
        mx={0}
        style={{
          background:
            width > breakpoint
              ? 'linear-gradient(90deg, #558DAB 46%,  #FAF3D8 54%)'
              : '#558DAB',
        }}
      >
        <Grid.Col xs={12} sm={6} pt={30}>
          <Title order={2} color="#EEEEEE">
            The Old Way
          </Title>
        </Grid.Col>

        {width > breakpoint && (
          <Grid.Col sm={6} pt={30}>
            <Title order={2} color="#546E7A">
              Our Way
            </Title>
          </Grid.Col>
        )}
      </Grid>

      <Carousel
        p={25}
        py={55}
        withIndicators
        height="auto"
        slideSize="100%"
        slideGap="sm"
        align="center"
        loop
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        style={{
          background:
            width > breakpoint
              ? 'linear-gradient(90deg, #558DAB 46%,  #FAF3D8 54%)'
              : 'linear-gradient(0deg, #FAF3D8 46%,  #558DAB 54%)',
        }}
      >
        {[0, 2, 4, 6].map((i) => (
          <Carousel.Slide>
            <Grid justify="space-around" align="stretch">
              <Grid.Col sm={4}>
                <Box
                  pt="25px"
                  style={{
                    position: 'relative',
                  }}
                >
                  {midSize && <Space h={20} />}
                  <Image
                    mah={500}
                    maw={500}
                    radius="sm"
                    src={Slides[i].img}
                    m="auto"
                  />
                  {Slides[i].txt.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: width > breakpoint ? '-5%' : '0%',
                        top: '0%',
                        height: 'auto',
                        backgroundColor: '#fafafa',
                        borderRadius: '3px',
                        border: '2px black solid',
                        color: 'black',
                        fontSize: midSize ? '15px' : '18px',
                        fontWeight: 500,
                        maxWidth: '400px',
                        textAlign: 'left',
                        padding: '5px 15px',
                        // fontFamily: "Comic Book",
                        fontFamily: 'Raleway, Roboto',
                        zIndex: '1000 !important',
                      }}
                    >
                      {Slides[i].txt}
                    </div>
                  )}
                </Box>
              </Grid.Col>
              {width < breakpoint && <Space h={50} />}

              <Grid.Col sm={4} pt={width < breakpoint ? '100px' : '8px'}>
                {width < breakpoint && (
                  <Title order={2} color="#546E7A" pt={50} pb={40}>
                    Our Way
                  </Title>
                )}

                <Box
                  pt="25px"
                  style={{
                    position: 'relative',
                  }}
                >
                  {midSize && <Space h={20} />}
                  <Image
                    mah={500}
                    maw={500}
                    radius="sm"
                    src={Slides[i + 1].img}
                    m="auto"
                  />
                  {Slides[i + 1].txt.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: width > breakpoint ? '-5%' : '0%',
                        top: '0%',
                        height: 'auto',
                        backgroundColor: '#fafafa',
                        borderRadius: '3px',
                        border: '2px black solid',
                        color: 'black',
                        fontSize: midSize ? '15px' : '18px',
                        fontWeight: 500,
                        maxWidth: '400px',
                        textAlign: 'left',
                        padding: '5px 15px',
                        fontFamily: 'Raleway, Roboto',
                      }}
                    >
                      {Slides[i + 1].txt}
                    </div>
                  )}
                </Box>
              </Grid.Col>
            </Grid>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default ComicPic;
