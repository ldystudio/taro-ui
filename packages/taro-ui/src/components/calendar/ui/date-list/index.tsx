import classnames from 'classnames'
import React from 'react'
import { View, Image } from '@tarojs/components'
import { Calendar } from '../../../../../types/calendar'
import * as constant from '../../common/constant'

const MAP: { [key: number]: string } = {
  [constant.TYPE_PRE_MONTH]: 'pre',
  [constant.TYPE_NOW_MONTH]: 'now',
  [constant.TYPE_NEXT_MONTH]: 'next'
}

export interface Props {
  list: Calendar.List<Calendar.Item>

  onClick?: (item: Calendar.Item) => void

  onLongClick?: (item: Calendar.Item) => void
}

export default class AtCalendarList extends React.Component<Props> {
  private handleClick = (item: Calendar.Item): void => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(item)
    }
  }

  private handleLongClick = (item: Calendar.Item): void => {
    if (typeof this.props.onLongClick === 'function') {
      this.props.onLongClick(item)
    }
  }

  public render(): JSX.Element | null {
    const { list } = this.props
    if (!list || list.length === 0) return null

    return (
      <View className='at-calendar__list flex'>
        {list.map((item: Calendar.Item) => (
          <View
            key={`list-item-${item.value}`}
            onClick={this.handleClick.bind(this, item)}
            onLongPress={this.handleLongClick.bind(this, item)}
            className={classnames(
              'flex__item',
              `flex__item--${MAP[item.type]}`,
              {
                'flex__item--previous':
                  item.value < (list.find(x => x.isToday)?.value || 0),
                'flex__item--marked': item.marks && item.marks.length > 0,
                'flex__item--today': item.isToday,
                'flex__item--active': item.isActive,
                'flex__item--selected': item.isSelected,
                'flex__item--selected-head': item.isSelectedHead,
                'flex__item--selected-tail': item.isSelectedTail,
                'flex__item--blur':
                  item.isDisabled ||
                  item.type === constant.TYPE_PRE_MONTH ||
                  item.type === constant.TYPE_NEXT_MONTH
              }
            )}
          >
            <View className='flex__item-container'>
              <View className='container-text'>
                {item.isToday ? '今' : item.text}
              </View>
            </View>
            <View className='flex__item-extra extra'>
              {item.marks && item.marks.length > 0 && (
                <View className='extra-marks'>
                  <Image
                    className='mark-icon'
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAC90lEQVR4AWIwudgLaN+useMIoigMO5pJzMz7EOMWRrF3YGptw8yUGDKzI7FkZmZmZsbneyMxvIbqVz3qcz6DsP7h6apKyniogwC2QDNcgcfwDugxXIEW2AIB1MH4pMYV9w+cC0vhKPwBCekPHIWlMN9icCUcVERq4w9ClYXgaugCcaQLqtMIngU7QFKyA2a5Ci7AB5CUfYBCksE5WA1izGrIxx08DlpAjOqEyXEFT4MzIMZdgGlRgyfAWRBPnIMJYYNz0ArimVbIhQleC+KptdrgAojnGkYaPAfeZyCYDXNHErwHJCP2DBdcA5IxdUMFH85g8OHBgitBMqpyoOCDINaUXlopm18cl8c/38uvf3/4N//Pj2t+zsG+wdPht7XYmitr5MrX5zLQcfHrUym/POJotk3vGbzIYuy1by9kqGPji2Oan7moZ/Bh32J5PP35Qf3gxdjx8Me3WB64T2vPjY1ncL2PsSGuYapn8FL3j5zRY3ls0t2HqZHBWzXfxEdGPkIOdPARFQN3Env56zPNozTR1jHaUze8VIc6OHAERI1V/A6VFgZf0XwT7jeKAZmKpasMfqz5JtxnNQOzFEuPGPxOfw2rBmgllt6pg3EfVg+09spaC7H0gsGPtY/SeIQMFZ1yLN1VP2gBBx9q4CnH0kXF01L06JRjqYXBWx28OrIQS1sZHIC4j3YeS42KNw+KaJuxVK94e6iIthn7ByYoTgAoou3F0mHFKR51tLVYWqQ/iaePdhurOIlHh0BcRTuMpUNOTsQz6PDHu/1iu/Axh7FU6XSqZcHtXbL8WQfx32amWqgOJGPqR6dL+5hbbBPi1FBMSx6I1nkcuy7ssqV2D2M7wy5boilwyaPYSzAl6tLD6XDek9jpcS0uHQ9thmO7NItLRyoPa4yuussXwwLxj1BwuQVgZ4qxu2BWWps8DjsMPQI1FrbxVMEh+JtA5F845HQbj8J8COBYDBu1jkFgY6OWfiveNmiF83APXhLcg/PQCttcbMX7D5BRTXKGdigJAAAAAElFTkSuQmCC'
                  />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
