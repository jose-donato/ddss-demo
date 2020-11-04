import React from 'react';
import { List } from 'react-native-paper';

const ListItem = ({title, description}) => {
    return (
        <List.Item
            title={title}
            description={description}
            left={props => <List.Icon {...props} icon="web" />}
        />
    );
};

export default ListItem;