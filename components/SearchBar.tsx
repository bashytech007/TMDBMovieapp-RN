// import { View, Text ,Image, TextInput} from 'react-native'
// import React from 'react'
// import {icons} from "../constants/icons"
// interface Props{
//     placeholder:string;
//     onPress?:()=>void;
// }
// const SearchBar = ({placeholder,onPress}:Props) => {
//   return (
//     <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
//       <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>
//     <TextInput
//     onPress={()=>{onPress}}
//     placeholder={placeholder}
//     value=""
//     onChangeText={()=>{}}
//     placeholderClassName='#a8bff'
//     className='flex-1 ml-2 text-white'
//     />
    
//     </View>
//   )
// }

// export default SearchBar

import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from "../constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  // If onPress is provided, make it a button. Otherwise, make it a functional input
  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
          <Image 
            source={icons.search} 
            className='size-5' 
            resizeMode='contain' 
            tintColor="#ab8bff"
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor='#a8bff'
            value={value}
            onChangeText={()=>{}}
            className='flex-1 ml-2 text-white'
            // editable={false}
            // pointerEvents='none'
          />
        </View>
      </TouchableOpacity>
    );
  }

  // Functional search input
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image 
        source={icons.search} 
        className='size-5' 
        resizeMode='contain' 
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#a8bff'
        className='flex-1 ml-2 text-white'
      />
    </View>
  );
};

export default SearchBar;