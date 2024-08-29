import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme';

const LocationCard = ({ location }) => {
    if (!location) {
        return <Text>No location selected</Text>;
    }

    // get current date and time
    const now = new Date();
    const currentDay = now.getDay(); // 0 for sund, 1 for mon, etc.
    const currentTime = now.getHours() * 100 + now.getMinutes(); // time in HHMM format

    console.log(currentTime)

    // function to parse store hours
    const getStoreHours = (hours) => {
        return hours.map(hour => {
            const [dayText, timeText] = hour.split(': ');
            // to get rid of any special chars
            const normalizedTimeText = timeText.replace(/\u2013|\u2014/g, '-')
            const [startTime, endTime] = normalizedTimeText.split('-');

            // convert to HHMM
            const convertHour = (time) => {
                // remove AM/PM and split hour and minute
                let [hour, minute] = time.replace('AM', '').replace('PM', '').trim().split(':').map(Number);
    
                // handle AM/PM conversion
                if (time.includes('PM') && hour !== 12) {
                    hour += 12; // PM hours (except 12 PM) should add 12
                } else if (time.includes('AM') && hour === 12) {
                    hour = 0; // 12 AM is midnight
                }
                return hour * 100 + (minute || 0); // Return HHMM format (ensure minute is a number)
            };

            const startTime24 = convertHour(startTime);
            const endTime24 = convertHour(endTime);
            
            const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayText.split(':')[0]);
            
            return {
                dayIndex,
                startTime: startTime24,
                endTime: endTime24,
                dayText
            };
        });
    };

    // function to check if the store is open now
    const isOpenNow = (hours) => {
        const parsedHours = getStoreHours(hours);
        const todayHours = parsedHours.find(hour => hour.dayIndex === currentDay);

        if (todayHours) {
            return currentTime >= todayHours.startTime && currentTime <= todayHours.endTime;
        }
        return false;
    };

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.header, styles.section]}>
                <Text style={styles.title}>{location.name}</Text>
                <Text style={styles.text}>{location.address}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Hours</Text>
                {location.hours.map((hour, index) => (
                    <Text key={index} style={styles.text}>{hour}</Text>
                ))}
                <Text style={[styles.text, isOpenNow(location.hours) ? styles.openText : styles.closedText]}>
                    {isOpenNow(location.hours) ? 'Open Now' : 'Closed Now'}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Contact</Text>
                <Text style={styles.text}>{location.number}</Text>
                <Text style={styles.text}>hi@bakery.com</Text>
                <Text style={styles.text}>bakery.com</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 24,
        gap: 24,
    },
    section: {
        gap: 4
    },
    title: {
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: '600'
    },
    heading: {
        fontSize: 16,
        color: COLORS.grey,
        fontWeight: '500'
    },
    text: {
        fontSize: 18,
        color: COLORS.black
    },
    openText: {
        fontSize: 18,
        color: COLORS.success
    }, 
    closedText: {
        fontSize: 18,
        color: COLORS.danger
    }
});

export default LocationCard;