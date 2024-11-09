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
	function EventSimulator(selector) {
		if (!selector) {
			throw new Error('No selector provided');
		}

		this.element = this.findElement(selector);

		if (!this.element) {
			throw new Error('Element not found');
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
		}
		return null;
	};

	// 分派事件的通用方法
	EventSimulator.prototype.dispatchEvent = function(eventType, options = {}) {
		const event = createEvent(eventType, options);
		this.element.dispatchEvent(event);
	};

	// 定义事件触发的方法
	const eventTypes = [
		'click', 'change', 'input', 'focus', 'blur', 'keydown', 'keyup', 'keypress',
		'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup',
		'dblclick', 'contextmenu', 'wheel', 'scroll', 'resize', 'load', 'error'
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
  "actions": [
    {"delay": 1250, "selector": " #side-menu > li.ng-scope.active > ul > li:nth-child(2) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > button"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(2) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(4) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(5) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(6) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(7) > a"},
    {"delay": 100, "selector": "#no-scroll-filter > div > div > div.col-md-2.col-order-9 > div > div > ul > li:nth-child(8) > a"}
  ]
};
// 执行所有动作
executeActionsWithDelay(data.actions).catch((error) => {
    console.error('An error occurred:', error);
});