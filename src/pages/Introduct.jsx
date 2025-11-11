import { Link } from "react-router-dom"
import "../components/introduce.css"

const Introduce=()=>{

    
    var turn=1;

    window.setInterval(function() {
        var elements = document.getElementsByClassName('turn'); // ❌ 注意这里不能加点！
        var n = 90 * turn;
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.transform = 'rotateY(' + n + 'deg)';
        }
    
        turn++;
    }, 3000);

    localStorage.setItem("ifLogin",false);

    return(
        <>
        <div className="turnShow con">
    <div className="turn">
        <div className="f"></div>
        <div className="s"></div>
        <div className="t"></div>
        <div className="four"></div>
    </div>
</div>
<div className="head">
    <img src=" /images/head.png" alt="head"/>
</div>
<div className="main con">
    <ul>
        <li><div className="content">
            <div className="img1">
                <img src=" /images/dogCon.jpg" alt="dog"/>
            </div>
            <div className="p1">
                <p>
                    Pets hold a special place in the hearts of millions around the world. This bond between pets and people is
                    a relationship built on love, trust, and mutual understanding.
                </p>
                <p>
                    <b>Do you wanner get one ? take a look at our PetStore!</b>
                </p>
            </div>
        </div></li>
        <li><div className="content">
            <div className="img2">
                <img src=" /images/healthAn.jpg" alt="healthAnimal"/>
            </div>
            <div className="p2">
                <p>
                    Our store features a wide range of products tailored for cats, dogs, birds, fish, and small animals. We also offer expert advice from our knowledgeable staff to ensure your pets lead happy, healthy lives.
                </p>
            </div>
        </div></li>
        <li><div className="content">
            <div className="img3">
                <img src=" /images/favAn.png" alt="fav"/>
            </div>
            <div className="p3">
                We offer personalized services, providing tailored recommendations to suit your pet's unique needs.
            </div>
        </div></li>
        <li><div className="content">
            <div className="img4">
                <img src=" /images/deliver.jpg" alt="deliver"/>
            </div>
            <div className="p4">
                <p>At PetStore, we understand that life can get busy, and making time to shop for your pet’s essentials isn’t always easy. That’s why we’re excited to offer fast, reliable delivery services to bring everything your pet needs right to your doorstep!</p>
            </div>
        </div></li>
    </ul>
    <div className="getit">
        <Link to="/main">Get it</Link> 
    </div>
</div>
        </>
    )
}

export default Introduce