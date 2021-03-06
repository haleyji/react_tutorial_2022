import React from 'react';

class ProductCategoryRow extends React.Component {
    render(){
        return(
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
}
class ProductRow extends React.Component {
    render(){
        const product = this.props.product;
        const name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>;
        return(
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}
class ProductTable extends React.Component {
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product)=>{
            if(product.name.indexOf(filterText)===-1){
                return;
            }
            if(inStockOnly && !product.stocked){
                return;
            }
            if(product.category !== lastCategory){
                rows.push(
                    <ProductCategoryRow category={product.category} key={product.category} />
                )
            }
            rows.push(
                <ProductRow product={product} key={product.name} />
            );
            lastCategory = product.category;
        });
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }
    handleChange(e){
        this.props.handleChange(e.target.value);
    }
    handleChecked(e){
        this.props.handleChecked(e.target.checked)
    }
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return(
            <form>
                <input type="text" placeholder="Search..." value={filterText} onChange={this.handleChange}/>
                <p>
                    <input type="checkbox" checked={inStockOnly} onChange={this.handleChecked}/>
                    {' '} Only show products in stock
                </p>
            </form>
        )
    }
}
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default class Mock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }
    handleChange(filterText){
        this.setState({
            filterText: filterText
        })
    }
    handleChecked(inStockOnly){
        this.setState({
            inStockOnly: inStockOnly
        })
    }
    render(){
        return(
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} handleChange={this.handleChange} handleChecked={this.handleChecked}/>
                <ProductTable products={PRODUCTS} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
            </div>
        )
    }
}
