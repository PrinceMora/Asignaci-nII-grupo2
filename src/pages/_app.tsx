import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import TaskContextProvider from './context/TaskContext';

export default function App({Component, pageProps}: AppProps) {
	return (
		<TaskContextProvider>
			<div>
				<Component {...pageProps} />;
			</div>
		</TaskContextProvider>
	);
}
