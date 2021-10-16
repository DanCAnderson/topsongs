import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import sortArray from 'sort-array';

import './songTable.scss';

let songs = require('../topSongs.json');
console.log(sortArray);

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

        sortArray( songs, { by: column, order: reverse ? 'desc' : 'asc' });
    }

    render() {
        return (
            <div className='song-wrapper'>
                <div className='song-table-header'>
                    <span className='song-rank-2004'>2004</span>
                    <span className='song-rank-2021'>2021</span>
                    <span className='song-title'>Title</span>
                    <span className='song-artist'>Artist</span>
                    <span className='song-year'>Year</span>
                </div>
                <ol className='song-table'>
                    {this.state.display.map((song, index) => {
                        return <li key={index}>
                                <span className='song-rank-2004'>{song.ranking[2004]}</span>
                                <span className='song-rank-2021'>{song.ranking[2021]}</span>
                                <span className='song-title'>{song.title}</span>
                                <span className='song-artist'>{song.artist}</span>
                                <span className='song-year'>{song.year}</span>
                            </li>
                    })}
                </ol>
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