# SLIDER

Assume that you have a component named **TargetComponent** that you want to slide on prop changes. This component takes props which can be described inside object **targetElemProps**.

### To slide your present component on change of props is very simple now. Slider component require 4 props:

1. **childProps** - All the props of your target element that is going to be animated. **{...targetElemProps}**.
2. **watchProp** - A value, on change of which animation should occur. This could be any variable, prop or state value. But recommendation from my side is that this should be a literal value contained inside targetElemProps, say ‘foo’. So targetElemProps.foo.
3. **direction** - Direction in which targetElement should slide. _Confused_? Are you thinking it should be defined in the **Slider** component itself? I know it’s something new, but it’s awesome! Giving developer the freedom to choose the direction when _targetElemProps_ or _targetElemProps.foo_ changes. Remember, sliding is not dependent on any dom event, promise, observable or any async process. It’s dependent on one simple react philosophy - **changing the prop**. Also direction could be **right, left, up or down**.
4. **childStyles** - This is the only requirement from developer, but it also provides more control to developer. The two values which are must right now:

a. **height** - a number for pixels
b. **width** - a number for pixels

> Note: For now only these two are major requirements in terms of styling, rest every style is determined by developer in his/her component. You don’t need to bleed up or bleed down styles, and you are totally free to use any styling solution, Slider is independent of all.

#### But as a developer I want to control Slider’s styles, true. And developer should rule this component’s behavior and style as much as possible. So childStyles can contain these things too:

1. **transitionTime** - How long should one slide translate. Equivalent to transition-duration property of css. But please provide Slider a number like 2 rather than a string like ‘2s’.
2. **enterTransitionTime** and exitTransitionTime - But what if as a developer I don’t want the sliding duration of both entering element and exiting element to be different. Slider has got you covered.
3. **timingFunction** - What should be the easing function(bezier-curve) of the sliding transition. Equivalent of transition-timing-function in CSS. default is ‘linear’.
4. **enterTimingFunction** and **exitTimingFunction** - But what if as a developer I don’t want the sliding duration of both entering element and exiting element to be different. Slider has got you covered.

> Note: You can see there is no default for transitionTime, it’s suggested to provide either ‘transitionTime’ or both ‘enterTransitionTime and exitTransitionTime’.

I don’t think as a dev anyone would need more than this for styling, but if there’s a scope please tell [me](mailto:vineetdev2008@gmail.com) or [contribute](../../CONTRIBUTING.md)!.

### But some behaviors cannot be expressed through styling. So Slider provides more control(yes more !) through optional props. Like:

1. **slideOnAppear** - Should the target element slide if we see it for first time?
2. **fadeOnSlide** - Should the exiting element while sliding fade-out and entering element fade-in while sliding.
3. **sizePercentageDuringSlide** - What if as a developer I don’t want to slide the whole width(in case of fadeOnSlide, sometimes this could be a scenario). So give the percentage width/height uptil which it should be sliding. It’s necessary to provide fadeOnSlide as true alongwith this prop.
4. **transitionDone** - When single transition is done then this callback will be called.
