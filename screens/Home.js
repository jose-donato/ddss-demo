import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { callApi } from '../utils/api';
import {
  Input,
  Card,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

export default function Home({ navigation, logout }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Card>
        <Input
          label={'Shodan query'}
          placeholder="Shodan query..."
          value={query}
          onChangeText={setQuery}
        />
        {loading && <ActivityIndicator size="large" />}
        <Button
          onPress={async () => {
            setLoading(true);
            const res = await callApi(query);
            setLoading(false);
            setResults(res);
          }}
          title="Call API"
        />
        {results.total && <Text>Total results: {results.total}</Text>}
        {results.matches && (
          <View>
            {results.matches.map((result) => (
              <View key={result.ip}>
                  <Text>{result.ip_str}</Text>
              </View>
            ))}
          </View>
        )}
      </Card>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}