import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import moment from 'moment';
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const Schedular = () => {
  const startTime = moment('00:00', 'HH:mm');
  const endTime = moment('23:59', 'HH:mm');
  const timeSlots: string[] = [];

  while (startTime.isSameOrBefore(endTime)) {
    timeSlots.push(startTime.format('hh:mm a'));
    startTime.add(15, 'minutes');
  }
  return (
    <Box sx={{ width: '50%', margin: '10' }}>
      <Card>
        <CardHeader>
          <Text as={'b'} fontSize='30'>
            Schedular
          </Text>
        </CardHeader>
        <CardBody>
          <Table>
            <Tbody>
              {weekDays.map((days) => {
                return (
                  <Tr>
                    <Td>
                      <Switch size='md' />
                    </Td>

                    <Td>
                      <Text fontSize='20'>{days}</Text>
                    </Td>
                    <Td>
                      <TimerSchedular timeSlots={timeSlots} />
                    </Td>
                    <Td>
                      <TimerSchedular timeSlots={timeSlots} />
                    </Td>
                    <Td>
                      <Button>+</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
};

interface TimerSchedularProps {
  timeSlots: string[];
}
const TimerSchedular: React.FC<TimerSchedularProps> = ({ timeSlots }) => {
  return (
    <Select>
      {timeSlots.map((item) => {
        return <option value={item}>{item}</option>;
      })}
    </Select>
  );
};

export default Schedular;
