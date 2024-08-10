import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { PreviewScreen } from './screens/PreviewScreen'

function App() {
	return (
		<div className='min-h-screen bg-white flex flex-col items-stretch'>
			<Router>
				<Routes>
					<Route path='/' element={<PreviewScreen />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
