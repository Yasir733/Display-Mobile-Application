import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { profile, isimage , color } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        {isimage ? (
          <View style={[styles.placeholder, { backgroundColor: color }]}>
            <Text style={styles.initials}>
              {`${profile.name.first.charAt(0).toUpperCase()}${profile.name.last.charAt(0).toUpperCase()}`}
            </Text>
          </View>
        ) : (
          <Image source={{ uri: profile.picture.large }} style={styles.image} />
        )}
        <Text style={styles.heading}>{`${profile.name.title} . ${profile.name.first} ${profile.name.last}`}</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Email | </Text>
          <Text style={styles.text}>{profile.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Phone | </Text>
          <Text style={styles.text}>{profile.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Cell | </Text>
          <Text style={styles.text}>{profile.cell}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Street | </Text>
          <Text style={styles.text}>{profile.location.street.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>City | </Text>
          <Text style={styles.text}>{profile.location.city}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>State | </Text>
          <Text style={styles.text}>{profile.location.state}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Country | </Text>
          <Text style={styles.text}>{profile.location.country}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Age | </Text>
          <Text style={styles.text}>{profile.dob.age} years</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Gender | </Text>
          <Text style={styles.text}>{profile.gender}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Username | </Text>
          <Text style={styles.text}>{profile.login.username}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Password | </Text>
          <Text style={styles.text}>{profile.login.password}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, alignItems: 'center', width: '100%' },
  profileCard: { backgroundColor: '#f6f7e8', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 20, elevation: 5, width: '100%' },
  image: { width: 270, height: 270, borderRadius: 150, marginBottom: 15, elevation: 10 },
  placeholder: { width: 270, height: 270, borderRadius: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 10 },
  initials: { fontSize: 150, fontWeight: 'bold', color: 'white' },
  heading: { fontSize: 28, fontWeight: 'bold', color: '#2b3618', textAlign: 'center' },
  detailContainer: { backgroundColor: '#f6f7e8', borderRadius: 10, padding: 20, width: '100%', elevation: 3 },
  detailItem: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 10, padding: 10, backgroundColor: '#fcf0da', borderRadius: 8, borderWidth: 1, borderColor: '#6d676e' },
  label: { fontWeight: 'bold', color: '#333', fontSize: 18 },
  text: { color: '#444', fontSize: 16 },
});


export default ProfileScreen;
