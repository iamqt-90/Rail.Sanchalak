import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'

export function useExampleQuery() {
  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const response = await axios.get('/example')
      return response.data
    },
  })
}
