import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

let songs = require('../topSongs.json');

class SongTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: songs.slice(0,10),
            pageCount: Math.ceil(songs.length / 10)
        };
    }

    handlePageClick = (data) => {
        this.setState({display: songs.slice(data.selected * 10, data.selected * 10 + 10)});
    }

    sortTable = (column, reverse=false) => {

        const order = (bool) => {
            return reverse ? !bool : bool;
        }

        songs.sort( (a, b) => {
            let compare;

            switch (column) {
                case '2004':
                    compare = a.ranking[2004] < b.ranking[2004];
                    break;
                case '2021':
                    compare = a.ranking[2021] < b.ranking[2021];
                    break;
                case 'title':
                    compare = a.title > b.title;
                    break;
                case 'artist':
                    compare = a.artist > b.artist;
                    break;
                default:
                    compare = 0;
            }

            return order(compare);
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.display.map((song, index) => {
                        return <li key={index}>{song.ranking[2004]} / {song.ranking[2021]} {song.title}, {song.artist}. {song.year}</li>
                    })}
                </ul>
                <ReactPaginate
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                />
                <button onClick={this.sortTable('title')}>Sort</button>
            </div>
        );
    }
}

export default SongTable;