import React from 'react'
import { View } from '@tarojs/components'

export default class AtCalendarHeader extends React.Component {
  public render(): JSX.Element {
    return (
      <View className='at-calendar__header header'>
        <View className='header__flex'>
          <View className='header__flex-item'>周日</View>
          <View className='header__flex-item'>周一</View>
          <View className='header__flex-item'>周二</View>
          <View className='header__flex-item'>周三</View>
          <View className='header__flex-item'>周四</View>
          <View className='header__flex-item'>周五</View>
          <View className='header__flex-item'>周六</View>
        </View>
      </View>
    )
  }
}
