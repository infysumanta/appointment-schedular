import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Select,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';

const Scheduler = () => {
  const startTime = moment('00:00', 'HH:mm');
  const endTime = moment('23:59', 'HH:mm');
  const [dailySlots, setDailySlots] = useState([
    {
      day: 'Sunday',
      slots: [
        {
          startTime: '00:00',
          endTime: '00:15',
        },
      ],
    },
    {
      day: 'Monday',
      slots: [
        {
          startTime: '00:00',
          endTime: '00:15',
        },
      ],
    },
    {
      day: 'Tuesday',
      slots: [
        {
          startTime: '00:00',
          endTime: '00:15',
        },
      ],
    },
  ]);
  const timeSlots: string[] = [];

  while (startTime.isSameOrBefore(endTime)) {
    timeSlots.push(startTime.format('hh:mm a'));
    startTime.add(15, 'minutes');
  }

  const addSlots = (day: string) => {
    const newDailySlots = dailySlots.map((dailySlot) => {
      if (dailySlot.day === day) {
        return {
          ...dailySlot,
          slots: [
            ...dailySlot.slots,
            {
              startTime: '00:00',
              endTime: '00:15',
            },
          ],
        };
      }
      return dailySlot;
    });
    setDailySlots(newDailySlots);
  };

  return (
    <Box width='50%' margin='10px'>
      <Card>
        <CardHeader>
          <Text as='b' fontSize='30px'>
            Scheduler
          </Text>
        </CardHeader>
        <CardBody>
          <Box display='flex' flexDirection='column'>
            {dailySlots.map((dailySlot) => (
              <Box
                key={dailySlot.day}
                display='flex'
                alignItems='flex-start'
                marginBottom='10px'
                justifyContent='space-between'
              >
                <Text fontSize='20px'>{dailySlot.day}</Text>
                <Flex flexDirection='column'>
                  {dailySlot.slots.map((slot) => (
                    <WeekDaysWithSlots
                      key={`${slot.startTime}-${slot.endTime}`}
                      slot={slot}
                      timeSlots={timeSlots}
                    />
                  ))}
                </Flex>
                <Button onClick={() => addSlots(dailySlot.day)} size='sm'>
                  +
                </Button>
              </Box>
            ))}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Scheduler;

interface WeekDaysWithSlotsProps {
  slot: {
    startTime: string;
    endTime: string;
  };
  timeSlots: string[];
}

const WeekDaysWithSlots: React.FC<WeekDaysWithSlotsProps> = ({
  slot,
  timeSlots,
}) => {
  return (
    <Flex flexDirection='row' key={`${slot.startTime}-${slot.endTime}`}>
      <TimeSchedular time={slot.startTime} timeSlots={timeSlots} />
      <TimeSchedular time={slot.endTime} timeSlots={timeSlots} />
    </Flex>
  );
};

interface TimeSchedularProps {
  time: string;
  timeSlots: string[];
}

const TimeSchedular: React.FC<TimeSchedularProps> = ({ time, timeSlots }) => {
  return (
    <Select value={time}>
      {timeSlots.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );
};
