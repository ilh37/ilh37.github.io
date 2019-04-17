---
layout: post
title: Twelve Pentagons
---

Soccer balls have a pattern that is made out of only pentagons and hexagons.

<div style="text-align: center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Football_Pallo_valmiina-cropped.jpg" alt="Soccer ball"/>
    <p><i><a href="https://commons.wikimedia.org/wiki/File:Football_Pallo_valmiina-cropped.jpg">This image</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/2.5/deed.en">CC BY-SA 2.5</a></i></p>
</div>

The polyhedron formed by the official soccer ball is a truncated icosahedron, which has 12 pentagons and 20 hexagons. We can look at graphs that have only pentagons and hexagons, and have three faces meet at every vertex. Call these graphs *soccer ball graphs*.

It turns out that soccer ball graphs have an interesting property. Let $$P$$ be the number of pentagons and $$H$$ be the number of hexagons. If we count the corners of each face exactly once, we count each vertex exactly three times since each vertex is adjacent to three faces. In other words, $$3V=5P+6H.$$ By contrast, if we count the edges of each face exactly once, each edge will be counted twice, meaning that $$2E=5P+6H.$$ Also, clearly $$F=P+H.$$

We can use Euler's formula to get that

$$\frac{5P+6H}{3}-\frac{5P+6H}{2}+P+H=2. $$

After simplifying the whole mess, it turns out that all the $$H$$s cancel out and we are left with $$\frac{1}{6}P=2$$, or $$P=12$$. Any soccer ball graph must have exactly 12 pentagons!

In fact, these soccer ball graphs are useful for more than just soccer ball variants. They also describe the structure of the molecule buckminsterfullerene, made out of 60 carbon atoms arranged in a soccer ball shape.

<div style="text-align: center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Buckminsterfullerene-perspective-3D-balls.png" alt="Buckminsterfullerene molecule" width="400px"/>
    <p><i>Public domain</i></p>
</div>

Carbon atoms can form double bonds, so each carbon atom is bonded to three other carbon atoms, with one bond being a double bond. Furthermore, these molecules have pentagons and hexagons as faces since these are the most stable. This forms an entire family of molecules known as *fullerenes*, which in fact form soccer ball graphs.

The three most well known fullerences are the following: $$C_{20}$$ has 20 carbon atoms arranged in a dodecahedron (a Platonic solid with, you guessed it, 12 pentagons); $$C_{60}$$, which is buckminsterfullerene; and $$C_{70}$$. Of course, there are more complex fullerenes, like $$C_{540}$$, which has 540 carbon atoms arranged in an icosahedral shape. Nevertheless, it has exactly 12 pentagonal faces.
