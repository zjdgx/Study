import React from 'react';

require('./fileInput.styl');

export default class Input extends React.Component {
   onFileSelected () {
      this.props.onFileSelected(this.refs['file']);
   };

   render () {
      return (
         <div className='zjdgx-file-input'>
            <input ref='file' type='file' onChange={this.onFileSelected.bind(this)} />
            <span>选择文件</span>
         </div>
      );
   };
}
