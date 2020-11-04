import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { callApi, __UNSAFE__callApi } from '../utils/api';
import {
  Input,
  Card,
  Button,
} from 'react-native-elements';
import ListItem from "../components/ListItem"

export default function Home({ navigation, jwt }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
      <Card containerStyle={{width: "90%"}}>
        <Input
          accessibilityLabel="home_shodanQueryInput"
          label={'Shodan query'}
          placeholder="Shodan query..."
          value={query}
          onChangeText={setQuery}
        />
        {loading && <ActivityIndicator size="large" />}
        <Button
          onPress={async () => {
            setLoading(true);
            const res = await callApi(query, jwt);
            setLoading(false);
            if(res.success) setResults(res.results);
          }}
          title="Call API"
        />
      </Card>
      <Card containerStyle={{width: "90%"}}>
        {results.length > 0 ? (
          <View>
            {results.map((result) => (
              <ListItem key={result.ip} title={result.ip_str} description={result.cpe?.join("\n")} />
            ))}
          </View>
        ) : <Text style={{textAlign: "center"}}>Search vulnerable devices</Text>}
      </Card>
    </View>
  );
}
