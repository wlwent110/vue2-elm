import {getStyle} from '../../config/mUtils'
import {imgBaseUrl} from '../../config/env'

export const loadMore = {
	directives:{
		'load-more':{
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
			    let requestFram;
			    let oldScrollTop;

			    document.addEventListener('scroll',() => {
			       loadMore();
			    },false)
				el.addEventListener('touchstart',() => {
			        height = el.offsetHeight;
			        setTop = el.offsetTop;
			        paddingBottom = getStyle(el,'paddingBottom');
			        marginBottom = getStyle(el,'marginBottom');
			    },false)

			    el.addEventListener('touchmove',() => {
			       loadMore();
			    },false)

			    el.addEventListener('touchend',() => {
			       	oldScrollTop = document.body.scrollTop;
			        moveEnd()
			    },false)
			    
			    const moveEnd = () => {
			        requestFram = requestAnimationFrame(() => {
			            if (document.body.scrollTop != oldScrollTop) {
			                oldScrollTop = document.body.scrollTop;
			                moveEnd()
			            }else{
			            	cancelAnimationFrame(requestFram);
			            	height = el.offsetHeight;
			                loadMore();
			            }
			        })
			    }

			    const loadMore = () => {
			        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
			            binding.value();
			        }
			    }
			}
		}
	}
};

export const getImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path){
			let suffix;
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			}else{
				suffix = '.png'
			}
			let url = '/' + path.substr(0,1) + '/' + path.substr(1,2) + '/' + path.substr(3) + suffix;
			return imgBaseUrl + url
		},
	}

}