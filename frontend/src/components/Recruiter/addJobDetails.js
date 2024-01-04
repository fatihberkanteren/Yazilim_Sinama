import React from 'react';
import { Button, Form } from 'react-bootstrap';

class RewardProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailCount: 0,
            detailInputs: [],
        };
    }

    handleCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        const detailInputs = new Array(count).fill('');
        this.setState({ detailCount: count, detailInputs });
    };

    handleDetailInputChange = (e, index) => {
        const { value } = e.target;
        const { detailInputs } = this.state;
        detailInputs[index] = value;
        this.setState({ detailInputs });
    };

    handleButtonClick = () => {
        // Butona tıklanınca çalışacak fonksiyon
        alert("Tebrikler! Hesabınıza 10 dolar eklendi.");
        this.props.history.push('/addJobDetails');
    };

    render() {
        const { detailCount, detailInputs } = this.state;

        const detailInputFields = detailInputs.map((input, index) => (
            <Form.Group key={index}>
                <Form.Label>Detay {index + 1}</Form.Label>
                <Form.Control
                    type="text"
                    value={input}
                    onChange={(e) => this.handleDetailInputChange(e, index)}
                />
            </Form.Group>
        ));

        return (
            <div className='container'>
                <h1>Ödül Projesi</h1>
                <p>
                    Kaç tane detay girmek istediğinizi seçin:
                    <select onChange={this.handleCountChange} value={detailCount}>
                        <option value={0}>Seçiniz</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>
                </p>
                {detailInputFields}
                <Button onClick={this.handleButtonClick}>Siteyi Ziyaret Et</Button>
            </div>
        );
    }
}

export default RewardProject;
