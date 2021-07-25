const onDomContentLoaded = (e) => {
    const clickMeRef = document.querySelectorAll('.clickme');
    const previewEleRef = document.querySelector('.previewEle');

    // Click handler
    const onClickMe = (ev) => {
        const fileName = ev.currentTarget.getAttribute('data-filename');
        previewEleRef.setAttribute('src', `/files/${fileName}`);
    };

    // Attach click event handler to every row in the table
    for (let i = 0; i < clickMeRef.length; i++) {
        clickMeRef[i].addEventListener('click', onClickMe);
    }

    document.querySelector('.create').addEventListener('submit', function(el){
        el.preventDefault();

        if (!document.querySelector('input[name="avatar"]').value) {
            alert('Input a file');
            return false;
        }


        this.submit();
    });
};

window.addEventListener('DOMContentLoaded', onDomContentLoaded);
