import { toArray } from 'common/collections';
import { useBackend } from '../backend';
import { AnimatedNumber, Section, Box } from '../components';
import { formatMoney } from '../format';
import { resolveAsset } from '../assets';
import { Window } from '../layouts';

export const Hacking = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    timeleft,
    games = [[[]]],
  } = data;
  return (
    <Window
      width={500}
      height={768}
      theme="hackerman">
      <Window.Content>
        <Section title="CYBERNETICS HACKING INTERFACE ">
          {toArray(games).map((array, i) => (
            <Section
              key={i}
              title={'HACKING IN PROGRESS [ ' + i + ' ]'}
              level={2}>
              [ TIME LEFT :
              <AnimatedNumber
                value={timeleft} /> ]
              <Minigame
                key={i}
                array={array}
                minigame_id={i} />
            </Section>
          ))}
        </Section>
      </Window.Content>
    </Window>
  );
};

const Minigame = (props, context) => {
  const { act, data } = useBackend(context);
  const {
    array = [[]],
    minigame_id = 0,
  } = props;
  return (
    toArray(array).map((arr, i) => (
      <Box key={i}>
        {toArray(arr).map((element, j) => (
          <Box
            style={{
              'width': '50px',
              'height': '50px',
            }}
            key={i + '_' + j}
            as="img"
            className="pathway"
            src={resolveAsset(element + '.png')}
            onClick={() => act('click', {
              xcord: i,
              ycord: j,
              id: minigame_id,
            })}
          />
        ))}
      </Box>
    ))
  );
};
