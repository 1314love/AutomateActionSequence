(function() {
	// 检测是否为XPath选择器的函数
	function isXPathSelector(selector) {
		const xpathRegex =
			/^(\/|\/\/|@|::|child::|descendant::|attribute::|ancestor::|self::|descendant-or-self::|ancestor-or-self::|following::|following-sibling::|preceding::|preceding-sibling::|parent::|element\()/;
		return xpathRegex.test(selector);
	}

	// 事件工厂函数
	function createEvent(eventType, options = {}) {
		let event;
		switch (eventType) {
			case 'MouseEvent':
				event = new MouseEvent(eventType, {
					bubbles: true,
					cancelable: true,
					...options
				});
				break;
			case 'KeyboardEvent':
				event = new KeyboardEvent(eventType, {
					bubbles: true,
					cancelable: true,
					...options
				});
				break;
			case 'FocusEvent':
				event = new FocusEvent(eventType, {
					bubbles: true,
					cancelable: true,
					...options
				});
				break;
			case 'WheelEvent':
				event = new WheelEvent(eventType, {
					bubbles: true,
					cancelable: true,
					...options
				});
				break;
			default:
				event = new Event(eventType, {
					bubbles: true,
					cancelable: true,
					...options
				});
				break;
		}
		return event;
	}

	// EventSimulator 构造函数
	function EventSimulator(elementOrSelector) {
		if (!elementOrSelector) {
			throw new Error('No element or selector provided');
		}

		// 如果传入的是元素，则直接使用
		if (elementOrSelector instanceof Element) {
			this.element = elementOrSelector;
		} else {
			// 否则，假设传入的是选择器，并查找元素
			this.element = this.findElement(elementOrSelector);

			if (!this.element) {
				throw new Error('Element not found');
			}
		}
	}

	// 查找元素的通用方法
	EventSimulator.prototype.findElement = function(selector) {
		if (isXPathSelector(selector)) {
			return document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
				.singleNodeValue;
		} else if (document.querySelector) {
			return document.querySelector(selector);
		} else if (/^#[\w-]+$/.test(selector)) {
			return document.getElementById(selector.slice(1));
		} else if (/^\.[\w-]+$/.test(selector)) {
			const elements = document.getElementsByClassName(selector.slice(1));
			return elements.length ? elements[0] : null;
		} else if (/^[\w-]+$/.test(selector)) {
			const elements = document.getElementsByTagName(selector);
			return elements.length ? elements[0] : null;
		}else if(selector instanceof Function){
			const elements=selector();
			return elements instanceof String ?this(elements):elements;
		}
		return null;
	};

	// 分派事件的通用方法
	EventSimulator.prototype.dispatchEvent = function(eventType, options = {}) {
		const event = createEvent(eventType, options);
		this.element.dispatchEvent(event);
	};

const eventTypes = [
  // 基本的鼠标和用户界面事件，所有现代浏览器均支持
  'click', 'change', 'input', 'focus', 'blur', 'keydown', 'keyup', 'keypress',
  'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup',
  'dblclick', 'contextmenu', 'wheel', 'scroll', 'resize', 'load', 'error',

  // 触摸事件，大多数现代浏览器支持，IE10+开始支持
  'touchstart', 'touchend', 'touchmove', 'touchcancel',

  // 拖放事件，现代浏览器支持，IE5+开始支持
  'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend',

  // 表单事件，所有现代浏览器均支持
  'submit', 'reset', 'select',

  // 动画事件，现代浏览器支持，IE10+开始支持
  'animationstart', 'animationend', 'animationiteration',

  // 过渡事件，现代浏览器支持，IE10+开始支持
  'transitionend',

  // 媒体事件，现代浏览器支持，IE9+开始支持
  'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended',
  'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing',
  'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend',
  'timeupdate', 'volumechange', 'waiting',

  // 网络事件，现代浏览器支持，IE9+开始支持
  'online', 'offline',

  // 剪贴板事件，现代浏览器支持，IE9+开始支持
  'copy', 'cut', 'paste',

  // 全屏事件，现代浏览器支持，IE11+开始支持
  'fullscreenchange', 'fullscreenerror',

  // 页面显示事件，现代浏览器支持，IE9+开始支持
  'pagehide', 'pageshow',

  // 存储事件，现代浏览器支持，IE8+开始支持
  'storage',

  // 窗口事件，所有现代浏览器均支持
  'afterprint', 'beforeprint', 'beforeunload', 'hashchange', 'languagechange', 'message', 'messageerror', 'popstate', 'rejectionhandled', 'unhandledrejection', 'unload',

  // 其他事件，所有现代浏览器均支持
  'readystatechange',

  // 组合事件，现代浏览器支持，IE9+开始支持
  'compositionstart', 'compositionupdate', 'compositionend',

  // 显示事件，现代浏览器支持，IE10+开始支持
  'show',

  // 其他窗口事件，所有现代浏览器均支持
  'DOMContentLoaded', 'beforeinstallprompt',

  // 其他表单事件，现代浏览器支持，IE10+开始支持
  'invalid', 'formdata'
];
	eventTypes.forEach(type => {
		EventSimulator.prototype[type] = function(options) {
			this.dispatchEvent(type, options);
		};
	});

	// 将 EventSimulator 对象暴露到全局作用域
	window.EventSimulator = EventSimulator;
})();
// 使用 async/await 优化异步流程
async function executeActionsWithDelay(actions) {
	let previousResult = null;
	for (const action of actions) {
		await new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Executing action with delay ${action.delay}`);
				if (action.function) {
					previousResult = action.function(previousResult);
				} else if (action.selector) {
					// 如果没有指定 actionType，则默认为 'click'
					const actionType = action.actionType || 'click';
					// 假设有一个 EventSimulator 类可以执行动作
					const simulator = new EventSimulator(action.selector);
					simulator[actionType](); // 使用 actionType 或默认值 'click'
				}
				resolve();
			}, action.delay);
		});
	}
	console.log('All actions completed', previousResult);
}

// 定义数据对象，包含actions数组
const data = {
	"actions": [{
			"delay": 1250,
			"selector": " #side-menu > li.ng-scope.active > ul > li:nth-child(2) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > button"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(2) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(4) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(5) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(6) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(7) > a"
		},
		{
			"delay": 100,
			"selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(8) > a"
		},
		{
			"delay": 50,
			"selector": "#attendance-check-table-new_wrapper > div > div:nth-child(1) > div > div > div.dataTables_scrollHead > div > table",
			"actionType": eventTypes.click
		},
		{
			"delay": 50,
			"selector": "#scheduledatepicker > input:nth-child(1)",
			"actionType": "focus"
		},
		{
			"delay": 50,
			"selector": "#ng-app > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > thead > tr:nth-child(1) > th.datepicker-switch",
			"actionType": eventTypes.click
		}, {
			"delay": 50,
			"selector": "#scheduledatepicker > input:nth-child(1)",
			"actionType": "focus"
		}, {
			"delay": 50,
			"function": () => {
				function formatMonthToChinese(date) {
					const options = {
						month: 'long',
						locale: 'zh-CN'
					};
					const monthName = date.toLocaleDateString('zh-CN', options);
					return monthName;
				}

				function getPreviousDay() {
					const date = new Date();
					date.setDate(date.getDate() - 1); // 获取上一天的日期
					return date;
				}

				const previousDay = getPreviousDay();
				var month = formatMonthToChinese(previousDay);
				// 选择指定的tr元素
				var trElement = document.querySelector(
					"#ng-app > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-months > table > tbody > tr > td"
				);

				// 检查是否找到了tr元素
				if (trElement) {
					// 选择tr元素下所有的td元素
					var tdElements = trElement.querySelectorAll('span');

					// 遍历td元素
					tdElements.forEach(function(td) {
						if (td.textContent.trim() === month) {
							var simulator = new EventSimulator(td);
							simulator.click();
						}
					});
				} else {
					console.log('指定的tr元素未找到');
				}

			}

		}, {
			delay: 50,
			"function": () => {

				function getLastDayBeforeYesterday() {
					// 创建一个新的日期对象，表示当前时间
					let today = new Date();

					// 获取上上一天的日期
					let lastDayBeforeYesterday = new Date(today);
					lastDayBeforeYesterday.setDate(lastDayBeforeYesterday.getDate() - 1);

					// 返回上上一天的日部分，不包括前导零
					return lastDayBeforeYesterday.getDate().toString();
				}

				let day = getLastDayBeforeYesterday()
				document.querySelectorAll(
					"#ng-app > div.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top > div.datepicker-days > table > tbody > tr:nth-child(2)>td"
				).forEach(element => {
					if (element.textContent == day) {
						console.log(element);
						new EventSimulator(element).click();
					}
				})
				
			}
		},
		{
			delay: 50,
			selector: "#no-scroll-filter > div > div > div.tr.col-md-4.col-order-11 > button.btn.btn-primary"
		}, {
			delay: 50,
			selector: "#no-scroll-filter > div > div > div.tr.col-md-4.col-order-11 > button.btn.ng-binding.vk-btn-default"
		}
	]
};


// 执行所有动作
executeActionsWithDelay(data.actions).catch((error) => {
	console.error('An error occurred:', error);
});
