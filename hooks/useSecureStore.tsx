import { useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store'

export default function useSecureStorage(key: string, initialValue: any) {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		(async () => {
			try {
				setValue(await getValueFor('jwtToken'))
			} catch (err) {
				console.error(err)
			}
		})()
	}, [])

	useEffect(() => {
		save(key, value)
	}, [key, value])

	return [value, setValue]
	
}

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) 
		return JSON.parse(result)
	return null
}
