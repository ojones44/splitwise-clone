import { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useAppContext } from '../context/appContext';
import { LuNotepadText } from 'react-icons/lu';
import { FaDollarSign } from 'react-icons/fa';
import type { AddExpense } from '../types/interfaces';

function AddExpense() {
	const { groupData } = useAppContext();
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState<AddExpense>({
		date: new Date(Date.now()),
		userId: 'testing',
		groupId: '',
		description: '',
		amount: 0,
	});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e: ChangeEvent<FormControlElement>) => {
		setFormData((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value,
		}));

		console.log(formData);
	};

	return (
		<>
			<Button
				className='position-absolute'
				style={{ bottom: '1rem', right: '1rem' }}
				variant='primary'
				onClick={handleShow}
			>
				Add expense
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Select
							name='groupId'
							onChange={handleChange}
							className='mb-3'
						>
							<option value=''>Select group..</option>
							{groupData?.map((group) => (
								<option key={group.id} value={group.id}>
									{group.name}
								</option>
							))}
						</Form.Select>
						<InputGroup className='mb-3'>
							<InputGroup.Text id='expense'>
								<LuNotepadText />
							</InputGroup.Text>
							<Form.Control
								placeholder='Enter a description of expense'
								aria-label='Enter a description of expense'
								aria-describedby='expense'
								name='description'
								value={formData.description}
								onChange={handleChange}
							/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text id='amount'>
								<FaDollarSign />
							</InputGroup.Text>
							<Form.Control
								type='number'
								step='0.01'
								placeholder='0.00'
								aria-label='0.00'
								aria-describedby='amount'
								name='amount'
								value={formData.amount}
								onChange={handleChange}
							/>
						</InputGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddExpense;
