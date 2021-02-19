import apollo from '@/plugins/apollo'
import EntriesQuery from '../graphql/Entries.graphql'

const entries = async variables => {
  const response = await apollo.query({
    query: EntriesQuery,
    variables
  })
  return response.data.entries
}

export default {
  entries
}
