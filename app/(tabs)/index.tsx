import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const NewAPI = 'https://randomuser.me/api/?results=100';

const Home = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [searching, setSearching] = useState('');
  const [filtering, setFiltering] = useState([]);
  const [cities, setCities] = useState('');
  const [age, setAge] = useState('');
  const [nmeOptions, setNmeOptions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true); 
  const colors = ['rgb(244, 81, 30)', 'rgb(116, 122, 31)', 'rgb(24, 128, 56)', '#b3261e', '#0b57d0'];

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true); 
      try {
        const response = await fetch(NewAPI);
        const data = await response.json();
        const profilesWithIndex = data.results.map((profile, index) => ({
          ...profile,
          originalIndex: index,
        }));
        setProfiles(profilesWithIndex);
        setFiltering(profilesWithIndex);
        setNmeOptions(profilesWithIndex);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchProfiles();
  }, []);

  const updateNmeOptions = (query) => {
    const nameMatches = profiles.filter((profile) => {
      const fullName = `${profile.name.first} ${profile.name.last}`.toLowerCase();
      return fullName.startsWith(query.toLowerCase());
    });
    setNmeOptions(nameMatches);
  };

  const handleSearch = () => {
    const parsedAge = parseInt(age, 10);
    const filtered = profiles.filter((profile) => {
      const fullName = `${profile.name.first} ${profile.name.last}`.toLowerCase();
      const matchesName = fullName.startsWith(searching.toLowerCase());
      const matchesCity = cities ? profile.location.city.toLowerCase() === cities.toLowerCase() : true;
      const matchesAge = parsedAge ? profile.dob.age === parsedAge : true;
      return matchesName && matchesCity && matchesAge;
    });
    setFiltering(filtered);
  };

  const clearInputs = () => {
    setSearching('');
    setCities('');
    setAge('');
    setFiltering(profiles);
    setShowSuggestions(false);
  };

  const renderProfile = ({ item }) => {
    const { name, location, dob, gender, picture, originalIndex } = item;
    const initials = `${name.first[0]}${name.last[0]}`.toUpperCase();
    const colorIndex = Math.floor(originalIndex / 5) % colors.length;
    const color = colors[colorIndex];
    const showInitials = (originalIndex + 1) % 5 === 0;
    return (
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => navigation.navigate('Profile Details', { profile: item, isimage: showInitials ? true : false, color: color })}
      >
        {showInitials ? (
          <View style={[styles.profileImage, { backgroundColor: color }]}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
        ) : (
          <Image source={{ uri: picture.medium }} style={styles.profileImage} />
        )}
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>Name: {`${name.first} ${name.last}`}</Text>
          <Text style={styles.dataText}>City: {location.city}</Text>
          <Text style={styles.dataText}>Age: {dob.age} years old | Gender: {gender}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const uniqueCities = [...new Set(profiles.map((profile) => profile.location.city))];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter the name"
        value={searching}
        onChangeText={(text) => {
          setSearching(text);
          updateNmeOptions(text);
          setShowSuggestions(text.length > 0);
        }}
      />
      {showSuggestions && searching && (
        <FlatList
          data={nmeOptions}
          renderItem={({ item }) => {
            const fullName = `${item.name.first} ${item.name.last}`;
            return (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setSearching(fullName);
                  setShowSuggestions(false);
                }}
              >
                <Text style={styles.suggestionText}>{fullName}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.login.uuid}
          style={styles.suggestionList}
        />
      )}
      <View style={styles.pickerContainer}>
        <Picker selectedValue={cities} style={styles.picker} onValueChange={(itemValue) => setCities(itemValue)}>
          <Picker.Item label="Select City" value="" />
          {uniqueCities.map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker>
        <Picker selectedValue={age} style={styles.picker} onValueChange={(itemValue) => setAge(itemValue)}>
          <Picker.Item label="Select Age" value="" />
          {[...Array(100).keys()].map((age) => (
            <Picker.Item key={age + 1} label={`${age + 1}`} value={`${age + 1}`} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {loading ? ( 
        <Text style={styles.loadingText}>Loading...</Text> 
      ) : filtering.length > 0 ? (
        <FlatList
          data={filtering}
          renderItem={renderProfile}
          keyExtractor={(item) => item.login.uuid}
          style={styles.profileList}
        />
      ) : (
        <Text style={styles.noProfilesText}>No profile available with the given info</Text>
      )}
    </View>
  );
};

let styles = StyleSheet.create({
  container:       { flex: 1, padding: 16, backgroundColor: '#f2f4d4' },
  searchInput:     { height: 60, backgroundColor: '#f6f7e8', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, fontSize: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  pickerContainer: { marginBottom: 20 },
  picker:          { height: 60, marginBottom: 20, borderCurve: 12, padding: 10, backgroundColor: '#f6f7e8' },
  profileContainer:{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 12, backgroundColor: '#f6f7e8', borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  profileImage:    { width: 80, height: 80, borderRadius: 50, marginRight: 16, elevation: 8, alignItems: 'center', justifyContent: 'center' },
  initialsText:    { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  profileInfo:     { flex: 1 },
  nameText:        { fontSize: 20, fontWeight: 'bold', color: '#2b3618' },
  dataText:        { fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  searchButton:    { width: '45%', height: 50, backgroundColor: '#7ccb6d', padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', elevation: 8 },
  clearButton:     { width: '45%', height: 50, backgroundColor: '#cb6d6d', padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', elevation: 8 },
  buttonText:      { fontSize: 18, color: '#fff' },
  suggestionList:  { marginBottom: 20, minHeight: 50, maxHeight: 200, backgroundColor: '#fff', borderRadius: 8, borderColor: '#ccc', borderWidth: 1 },
  suggestionItem:  { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  suggestionText:  { fontSize: 16 },
  noProfilesText:  { fontSize: 20, color: '#ff0000', textAlign: 'center', marginTop: 20 },
  loadingText:     { fontSize: 40, textAlign: 'center', marginTop: 20 }, 
  profileList:     { flex: 1 },
});

export default Home;


