<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer" @click="handleClick">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="flex items-center justify-center h-8 w-8 rounded-md" :class="iconBgClass">
          <component :is="icon" class="h-5 w-5" :class="iconClass" />
        </div>
      </div>
      <div class="ml-5 w-0 flex-1">
        <dl>
          <dt class="text-sm font-medium text-gray-500 truncate">{{ title }}</dt>
          <dd>
            <div class="text-lg font-medium text-gray-900">{{ formattedValue }}</div>
          </dd>
        </dl>
      </div>
    </div>
    <div v-if="change" class="mt-4">
      <div class="flex items-center text-sm">
        <span :class="changeClass">{{ change }}</span>
        <span class="text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number | string
  icon: any
  change?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
  format?: 'currency' | 'number' | 'percentage'
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  format: 'number',
  clickable: false
})

const emit = defineEmits<{
  click: []
}>()

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(props.value))
  } else if (props.format === 'percentage') {
    return `${props.value}%`
  } else if (props.format === 'number') {
    return new Intl.NumberFormat('en-US').format(Number(props.value))
  }
  return props.value
})

const iconBgClass = computed(() => {
  const classes = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }
  return classes[props.color]
})

const iconClass = computed(() => 'text-white')

const changeClass = computed(() => {
  if (!props.change) return ''
  const isPositive = props.change.startsWith('+')
  return isPositive ? 'text-green-600' : 'text-red-600'
})

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>
