import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  Switch,
  Text,
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

const SchedularOld = () => {
  const startTime = moment('00:00', 'HH:mm');
  const endTime = moment('23:59', 'HH:mm');
  const timeSlots: string[] = [];

  while (startTime.isSameOrBefore(endTime)) {
    timeSlots.push(startTime.format('hh:mm a'));
    startTime.add(15, 'minutes');
  }

  return (
    <Box width='50%' margin='10'>
      <Card>
        <CardHeader>
          <Text as='b' fontSize='30'>
            Schedular
          </Text>
        </CardHeader>
        <CardBody>
          <Box display='flex' flexDirection='column'>
            {weekDays.map((day) => (
              <Box
                key={day}
                display='flex'
                alignItems='center'
                marginBottom='2'
              >
                <Switch size='md' marginRight='2' />
                <Text fontSize='20'>{day}</Text>
                <TimerSchedular timeSlots={timeSlots} />
                <TimerSchedular timeSlots={timeSlots} />
                <Button marginLeft='2'>+</Button>
              </Box>
            ))}
          </Box>
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
    <Select marginLeft='2'>
      {timeSlots.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );
};

export default SchedularOld;
